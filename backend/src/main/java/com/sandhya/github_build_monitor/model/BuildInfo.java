package com.sandhya.github_build_monitor.model;

public class BuildInfo {

    private long id;
    private String name;
    private String status;
    private String conclusion;
    private String createdAt;
    private String duration;

    public BuildInfo(long id, String name, String status, String conclusion, String createdAt, String duration) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.conclusion = conclusion;
        this.createdAt = createdAt;
        this.duration = duration;
    }

    public long getId() { return id; }
    public String getName() { return name; }
    public String getStatus() { return status; }
    public String getConclusion() { return conclusion; }
    public String getCreatedAt() { return createdAt; }
    public String getDuration() { return duration; }
}