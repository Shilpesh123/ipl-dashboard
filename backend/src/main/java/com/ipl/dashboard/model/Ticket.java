package com.ipl.dashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String bookingId;
    
    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String category; // GENERAL, PREMIUM, VIP, CORPORATE
    private int quantity;
    private double amount;
    private double convenienceFee;
    private double totalAmount;
    private LocalDateTime bookingTime;
    private String paymentMethod;
    private String paymentStatus; // PENDING, COMPLETED, FAILED
    
    @ElementCollection
    @CollectionTable(name = "ticket_seats", joinColumns = @JoinColumn(name = "ticket_id"))
    @Column(name = "seat_number")
    private List<String> seats;
}
