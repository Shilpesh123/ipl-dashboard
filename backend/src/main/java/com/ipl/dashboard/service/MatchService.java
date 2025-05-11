package com.ipl.dashboard.service;

import com.ipl.dashboard.model.Match;
import com.ipl.dashboard.model.Team;
import com.ipl.dashboard.repository.MatchRepository;
import com.ipl.dashboard.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {
    
    @Autowired
    private MatchRepository matchRepository;
    
    @Autowired
    private TeamRepository teamRepository;
    
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }
    
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }
    
    public List<Match> getMatchesByTeam(Long teamId) {
        Optional<Team> team = teamRepository.findById(teamId);
        return team.map(t -> matchRepository.findByHomeTeamOrAwayTeam(t, t)).orElse(List.of());
    }
    
    public List<Match> getUpcomingMatches() {
        return matchRepository.findUpcomingMatches(LocalDateTime.now());
    }
    
    public List<Match> getCompletedMatches() {
        return matchRepository.findCompletedMatches(LocalDateTime.now());
    }
    
    public Match saveMatch(Match match) {
        return matchRepository.save(match);
    }
    
    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}
