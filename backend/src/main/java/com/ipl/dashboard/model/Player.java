package com.ipl.dashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "players")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String role; // BATSMAN, BOWLER, ALL_ROUNDER, WICKET_KEEPER
    private String country;
    private int age;
    private String avatar;
    private double price; // in crores
    
    // Batting stats
    private int matches;
    private int runs;
    private double average;
    private double strikeRate;
    private int fifties;
    private int hundreds;
    private int fours;
    private int sixes;
    
    // Bowling stats
    private int wickets;
    private double economy;
    private String bestBowlingFigures;
    private int fourWickets;
    private int fiveWickets;
    
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
