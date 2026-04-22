package com.sandhya.github_build_monitor.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sandhya.github_build_monitor.model.BuildInfo;
import com.sandhya.github_build_monitor.model.BuildSummary;
import com.sandhya.github_build_monitor.service.GitHubService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BuildController {

	private final GitHubService gitHubService;

    public BuildController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }
    
    @GetMapping("/builds")
    public List<BuildInfo> fetchBuilds(){
    	return gitHubService.fetchBuilds();
    }
    
    @GetMapping("/summary")
    public BuildSummary getSummary() {
    	return gitHubService.getSummary();
    }
}
