package com.ipl.dashboard.service;

import com.ipl.dashboard.model.Team;
import com.ipl.dashboard.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    
    @Autowired
    private TeamRepository teamRepository;
    
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
    
    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }
    
    public Optional<Team> getTeamByShortName(String shortName) {
        return teamRepository.findByShortName(shortName);
    }
    
    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }
    
    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }
}
