package com.ipl.dashboard.repository;

import com.ipl.dashboard.model.Match;
import com.ipl.dashboard.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByHomeTeamOrAwayTeam(Team homeTeam, Team awayTeam);
    List<Match> findByCompletedTrue();
    List<Match> findByCompletedFalse();
    
    @Query("SELECT m FROM Match m WHERE m.dateTime > ?1 ORDER BY m.dateTime ASC")
    List<Match> findUpcomingMatches(LocalDateTime now);
    
    @Query("SELECT m FROM Match m WHERE m.dateTime < ?1 AND m.completed = true ORDER BY m.dateTime DESC")
    List<Match> findCompletedMatches(LocalDateTime now);
}
