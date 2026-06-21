package edu.co.icesi.introspringboot.api.v1.dto;

import java.util.UUID;

public class StudentResponse {
    private UUID publicId;
    private String name;
    private String code;
    private String program;

    public UUID getPublicId() { return publicId; }
    public void setPublicId(UUID publicId) { this.publicId = publicId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }
}
