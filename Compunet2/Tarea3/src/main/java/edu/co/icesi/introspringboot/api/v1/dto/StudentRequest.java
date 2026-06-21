package edu.co.icesi.introspringboot.api.v1.dto;

public class StudentRequest {
    private String name;
    private String code;
    private String program;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }
}
