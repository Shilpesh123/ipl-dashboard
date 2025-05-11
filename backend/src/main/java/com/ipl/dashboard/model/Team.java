package com.ipl.dashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "teams")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String shortName;
    private String logo;
    private String primaryColor;
    private String secondaryColor;
    private String captain;
    private String homeGround;
    private int wins;
    private int losses;
    
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<Player> players;
    
    @OneToMany(mappedBy = "homeTeam")
    private List<Match> homeMatches;
    
    @OneToMany(mappedBy = "awayTeam")
    private List<Match> awayMatches;
}
