package com.ipl.dashboard.service;

import com.ipl.dashboard.model.Player;
import com.ipl.dashboard.model.Team;
import com.ipl.dashboard.repository.PlayerRepository;
import com.ipl.dashboard.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {
    
    @Autowired
    private PlayerRepository playerRepository;
    
    @Autowired
    private TeamRepository teamRepository;
    
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
    
    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }
    
    public List<Player> getPlayersByTeam(Long teamId) {
        Optional<Team> team = teamRepository.findById(teamId);
        return team.map(playerRepository::findByTeam).orElse(List.of());
    }
    
    public List<Player> getPlayersByRole(String role) {
        return playerRepository.findByRole(role);
    }
    
    public List<Player> getTopBatsmen() {
        return playerRepository.findTop10ByOrderByRunsDesc();
    }
    
    public List<Player> getTopBowlers() {
        return playerRepository.findTop10ByOrderByWicketsDesc();
    }
    
    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }
    
    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}
