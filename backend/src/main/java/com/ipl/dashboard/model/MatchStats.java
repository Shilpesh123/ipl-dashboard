package com.ipl.dashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "match_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchStats {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "match_id")
    private Match match;
    
    // Home team stats
    private int homeTeamRuns;
    private int homeTeamWickets;
    private double homeTeamOvers;
    private int homeTeamFours;
    private int homeTeamSixes;
    
    // Away team stats
    private int awayTeamRuns;
    private int awayTeamWickets;
    private double awayTeamOvers;
    private int awayTeamFours;
    private int awayTeamSixes;
    
    // Player of the match
    @ManyToOne
    @JoinColumn(name = "player_of_match_id")
    private Player playerOfMatch;
}
