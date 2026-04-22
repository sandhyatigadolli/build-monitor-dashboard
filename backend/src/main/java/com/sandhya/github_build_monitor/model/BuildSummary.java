package com.sandhya.github_build_monitor.model;

public class BuildSummary {
	
	private int total;
	private int success;
	private int failed;
	private int inProgress;
	
	public BuildSummary(int total, int success, int failed, int inProgress) {
		this.total=total;
		this.success=success;
		this.failed = failed;
		this.inProgress = inProgress;
	}
	
	public int getTotal() { return total; }
	public int getSuccess() { return success; }
	public int getFailed() { return failed; }
	public int getInProgress() { return inProgress; }	
}
