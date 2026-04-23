package com.sandhya.github_build_monitor.service;

import java.util.*;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sandhya.github_build_monitor.model.BuildInfo;
import com.sandhya.github_build_monitor.model.BuildSummary;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class GitHubService {
	private List<BuildInfo> cachedBuilds = new ArrayList<>();
	private long lastFetchTime = 0;

	public List<BuildInfo> fetchBuilds(){

	    // ⛔ Prevent frequent API calls
	    if (System.currentTimeMillis() - lastFetchTime < 120000) { // 2 minutes
	        return cachedBuilds;
	    }

	    String owner = "sandhyatigadolli";  
	    String repo = "github-build-monitor";       
	    String url = "https://api.github.com/repos/" + owner + "/" + repo + "/actions/runs";

	    RestTemplate restTemplate = new RestTemplate();

	  
	    String token = System.getenv("GITHUB_TOKEN");

	    if (token == null || token.isEmpty()) {
	        throw new RuntimeException("GITHUB_TOKEN is not set!");
	    }

	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", "Bearer " + token);

	    HttpEntity<String> entity = new HttpEntity<>(headers);

	    ResponseEntity<String> responseEntity = restTemplate.exchange(
	            url,
	            HttpMethod.GET,
	            entity,
	            String.class
	    );

	    String response = responseEntity.getBody();

	    List<BuildInfo> builds = new ArrayList<>();

	    try {
	        ObjectMapper mapper = new ObjectMapper();
	        JsonNode root = mapper.readTree(response);
	        JsonNode runs = root.get("workflow_runs");

	        for (JsonNode run : runs) {

	            long id = run.get("id").asLong();
	            String name = run.get("name").asText();
	            String status = run.get("status").asText();
	            String conclusion = run.get("conclusion").asText();
	            String createdAt = run.get("created_at").asText();
	            String updatedAt = run.get("updated_at").asText();

	            long durationSeconds = java.time.Duration.between(
	                    java.time.Instant.parse(createdAt),
	                    java.time.Instant.parse(updatedAt)
	            ).getSeconds();

	            String duration = durationSeconds + " sec";

	            builds.add(new BuildInfo(id, name, status, conclusion, createdAt, duration));
	        }

	        // ✅ CACHE UPDATE
	        cachedBuilds = builds;
	        lastFetchTime = System.currentTimeMillis();

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return cachedBuilds;
	}
    
    public BuildSummary getSummary() {

        List<BuildInfo> builds = fetchBuilds();

        int total = builds.size();
        int success = 0;
        int failed = 0;
        int inProgress = 0;

        for (BuildInfo build : builds) {

            if ("success".equalsIgnoreCase(build.getConclusion())) {
                success++;
            } else if ("failure".equalsIgnoreCase(build.getConclusion())) {
                failed++;
            } else {
                inProgress++;
            }
        }

        return new BuildSummary(total, success, failed, inProgress);
    }
}