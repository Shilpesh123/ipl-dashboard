package com.ipl.dashboard.controller;

import com.ipl.dashboard.dto.TicketBookingRequest;
import com.ipl.dashboard.model.Ticket;
import com.ipl.dashboard.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {
    
    @Autowired
    private TicketService ticketService;
    
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Ticket> getTicketByBookingId(@PathVariable String bookingId) {
        return ticketService.getTicketByBookingId(bookingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getTicketsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ticketService.getTicketsByUser(userId));
    }
    
    @GetMapping("/match/{matchId}")
    public ResponseEntity<List<Ticket>> getTicketsByMatch(@PathVariable Long matchId) {
        return ResponseEntity.ok(ticketService.getTicketsByMatch(matchId));
    }
    
      {
        return ResponseEntity.ok(ticketService.getTicketsByMatch(matchId));
    }
    
    @GetMapping("/match/{matchId}/available-seats")
    public ResponseEntity<List<String>> getAvailableSeatsByMatch(@PathVariable Long matchId) {
        return ResponseEntity.ok(ticketService.getAvailableSeatsByMatch(matchId));
    }
    
    @PostMapping("/book")
    public ResponseEntity<Ticket> bookTicket(@RequestBody TicketBookingRequest request) {
        return ResponseEntity.ok(ticketService.bookTicket(request));
    }
    
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Ticket> cancelTicket(@PathVariable Long id) {
        return ticketService.cancelTicket(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
