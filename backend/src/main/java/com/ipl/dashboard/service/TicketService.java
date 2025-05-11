package com.ipl.dashboard.service;

import com.ipl.dashboard.dto.TicketBookingRequest;
import com.ipl.dashboard.model.Match;
import com.ipl.dashboard.model.Ticket;
import com.ipl.dashboard.model.User;
import com.ipl.dashboard.repository.MatchRepository;
import com.ipl.dashboard.repository.TicketRepository;
import com.ipl.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TicketService {
    
    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private MatchRepository matchRepository;
    
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    
    public Optional<Ticket> getTicketById(Long id) {
        return ticketRepository.findById(id);
    }
    
    public Optional<Ticket> getTicketByBookingId(String bookingId) {
        return ticketRepository.findByBookingId(bookingId);
    }
    
    public List<Ticket> getTicketsByUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(ticketRepository::findByUser).orElse(List.of());
    }
    
    public List<Ticket> getTicketsByMatch(Long matchId) {
        Optional<Match> match = matchRepository.findById(matchId);
        return match.map(ticketRepository::findByMatch).orElse(List.of());
    }
    
    public List<String> getAvailableSeatsByMatch(Long matchId) {
        // Get all booked seats for this match
        List<String> bookedSeats = ticketRepository.findBookedSeatsByMatchId(matchId);
        
        // Generate all possible seats
        List<String> allSeats = generateAllSeats();
        
        // Return available seats (all seats minus booked seats)
        return allSeats.stream()
                .filter(seat -> !bookedSeats.contains(seat))
                .collect(Collectors.toList());
    }
    
    public Ticket bookTicket(TicketBookingRequest request) {
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        Optional<Match> matchOpt = matchRepository.findById(request.getMatchId());
        
        if (userOpt.isEmpty() || matchOpt.isEmpty()) {
            throw new RuntimeException("User or Match not found");
        }
        
        User user = userOpt.get();
        Match match = matchOpt.get();
        
        // Check if seats are available
        List<String> bookedSeats = ticketRepository.findBookedSeatsByMatchId(match.getId());
        boolean allSeatsAvailable = request.getSeats().stream()
                .noneMatch(bookedSeats::contains);
        
        if (!allSeatsAvailable) {
            throw new RuntimeException("Some selected seats are already booked");
        }
        
        // Create new ticket
        Ticket ticket = new Ticket();
        ticket.setBookingId("IPL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        ticket.setMatch(match);
        ticket.setUser(user);
        ticket.setCategory(request.getCategory());
        ticket.setQuantity(request.getSeats().size());
        ticket.setAmount(request.getAmount());
        ticket.setConvenienceFee(request.getConvenienceFee());
        ticket.setTotalAmount(request.getTotalAmount());
        ticket.setBookingTime(LocalDateTime.now());
        ticket.setPaymentMethod(request.getPaymentMethod());
        ticket.setPaymentStatus("COMPLETED");
        ticket.setSeats(request.getSeats());
        
        return ticketRepository.save(ticket);
    }
    
    public Optional<Ticket> cancelTicket(Long id) {
        Optional<Ticket> ticketOpt = ticketRepository.findById(id);
        
        if (ticketOpt.isPresent()) {
            Ticket ticket = ticketOpt.get();
            // Implement cancellation logic here
            // For example, set a cancelled status or refund amount
            ticketRepository.delete(ticket);
        }
        
        return ticketOpt;
    }
    
    // Helper method to generate all possible seats
    private List<String> generateAllSeats() {
        List<String> seats = new ArrayList<>();
        String[] sections = {"G", "P", "V", "C"}; // General, Premium, VIP, Corporate
        
        for (String section : sections) {
            for (int row = 1; row <= 10; row++) {
                for (int seat = 1; seat <= 20; seat++) {
                    seats.add(section + row + "-" + seat);
                }
            }
        }
        
        return seats;
    }
}
