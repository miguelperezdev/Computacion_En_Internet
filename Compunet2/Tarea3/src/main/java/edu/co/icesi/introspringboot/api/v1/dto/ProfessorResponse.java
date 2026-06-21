package edu.co.icesi.introspringboot.api.v1.dto;

import java.util.UUID;

public class ProfessorResponse {
    private UUID publicId;
    private String name;

    public UUID getPublicId() { return publicId; }
    public void setPublicId(UUID publicId) { this.publicId = publicId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
