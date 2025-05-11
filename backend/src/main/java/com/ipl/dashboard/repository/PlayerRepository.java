package com.ipl.dashboard.repository;

import com.ipl.dashboard.model.Player;
import com.ipl.dashboard.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByTeam(Team team);
    List<Player> findByRole(String role);
    List<Player> findTop10ByOrderByRunsDesc();
    List<Player> findTop10ByOrderByWicketsDesc();
}
