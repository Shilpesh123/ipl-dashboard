package com.ipl.dashboard.dto;

import lombok.Data;

import java.util.List;

@Data
public class TicketBookingRequest {
    private Long userId;
    private Long matchId;
    private String category;
    private List<String> seats;
    private double amount;
    private double convenienceFee;
    private double totalAmount;
    private String paymentMethod;
}
