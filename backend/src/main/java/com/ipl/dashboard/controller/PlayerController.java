package com.ipl.dashboard.controller;

import com.ipl.dashboard.model.Player;
import com.ipl.dashboard.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {
    
    @Autowired
    private PlayerService playerService;
    
    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerService.getAllPlayers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
        return playerService.getPlayerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Player>> getPlayersByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(playerService.getPlayersByTeam(teamId));
    }
    
    @GetMapping("/role/{role}")
    public ResponseEntity<List<Player>> getPlayersByRole(@PathVariable String role) {
        return ResponseEntity.ok(playerService.getPlayersByRole(role));
    }
    
    @GetMapping("/top-batsmen")
    public ResponseEntity<List<Player>> getTopBatsmen() {
        return ResponseEntity.ok(playerService.getTopBatsmen());
    }
    
    @GetMapping("/top-bowlers")
    public ResponseEntity<List<Player>> getTopBowlers() {
        return ResponseEntity.ok(playerService.getTopBowlers());
    }
    
    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        return ResponseEntity.ok(playerService.savePlayer(player));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        return playerService.getPlayerById(id)
                .map(existingPlayer -> {
                    player.setId(id);
                    return ResponseEntity.ok(playerService.savePlayer(player));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        return playerService.getPlayerById(id)
                .map(player -> {
                    playerService.deletePlayer(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
