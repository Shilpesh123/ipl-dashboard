package com.ipl.dashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "home_team_id")
    private Team homeTeam;
    
    @ManyToOne
    @JoinColumn(name = "away_team_id")
    private Team awayTeam;
    
    private LocalDateTime dateTime;
    private String venue;
    private String result;
    
    private String homeTeamScore;
    private String awayTeamScore;
    
    private boolean completed;
    
    @OneToOne(mappedBy = "match", cascade = CascadeType.ALL)
    private MatchStats matchStats;
}
