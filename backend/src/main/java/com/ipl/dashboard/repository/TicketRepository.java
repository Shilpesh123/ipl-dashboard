package com.ipl.dashboard.repository;

import com.ipl.dashboard.model.Match;
import com.ipl.dashboard.model.Ticket;
import com.ipl.dashboard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUser(User user);
    List<Ticket> findByMatch(Match match);
    Optional<Ticket> findByBookingId(String bookingId);
    
    @Query("SELECT t.seats FROM Ticket t WHERE t.match.id = ?1")
    List<String> findBookedSeatsByMatchId(Long matchId);
}
