// API service for connecting to the Spring Boot backend

const API_BASE_URL = "http://localhost:8080/api"

// Team API
export const fetchAllTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/teams`)
  if (!response.ok) {
    throw new Error("Failed to fetch teams")
  }
  return response.json()
}

export const fetchTeamById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/teams/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch team")
  }
  return response.json()
}

export const fetchTeamByShortName = async (shortName: string) => {
  const response = await fetch(`${API_BASE_URL}/teams/short-name/${shortName}`)
  if (!response.ok) {
    throw new Error("Failed to fetch team")
  }
  return response.json()
}

// Player API
export const fetchAllPlayers = async () => {
  const response = await fetch(`${API_BASE_URL}/players`)
  if (!response.ok) {
    throw new Error("Failed to fetch players")
  }
  return response.json()
}

export const fetchPlayerById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/players/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch player")
  }
  return response.json()
}

export const fetchPlayersByTeam = async (teamId: number) => {
  const response = await fetch(`${API_BASE_URL}/players/team/${teamId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch players")
  }
  return response.json()
}

export const fetchTopBatsmen = async () => {
  const response = await fetch(`${API_BASE_URL}/players/top-batsmen`)
  if (!response.ok) {
    throw new Error("Failed to fetch top batsmen")
  }
  return response.json()
}

export const fetchTopBowlers = async () => {
  const response = await fetch(`${API_BASE_URL}/players/top-bowlers`)
  if (!response.ok) {
    throw new Error("Failed to fetch top bowlers")
  }
  return response.json()
}

// Match API
export const fetchAllMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches`)
  if (!response.ok) {
    throw new Error("Failed to fetch matches")
  }
  return response.json()
}

export const fetchMatchById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch match")
  }
  return response.json()
}

export const fetchUpcomingMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches/upcoming`)
  if (!response.ok) {
    throw new Error("Failed to fetch upcoming matches")
  }
  return response.json()
}

export const fetchCompletedMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches/completed`)
  if (!response.ok) {
    throw new Error("Failed to fetch completed matches")
  }
  return response.json()
}

// Ticket API
export const fetchAvailableSeatsByMatch = async (matchId: number) => {
  const response = await fetch(`${API_BASE_URL}/tickets/match/${matchId}/available-seats`)
  if (!response.ok) {
    throw new Error("Failed to fetch available seats")
  }
  return response.json()
}

export const bookTicket = async (bookingData: any) => {
  const response = await fetch(`${API_BASE_URL}/tickets/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  })

  if (!response.ok) {
    throw new Error("Failed to book ticket")
  }
  return response.json()
}

export const fetchTicketByBookingId = async (bookingId: string) => {
  const response = await fetch(`${API_BASE_URL}/tickets/booking/${bookingId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch ticket")
  }
  return response.json()
}

// User API
export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to register user")
  }
  return response.json()
}

export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error("Failed to login")
  }
  return response.json()
}

export const fetchUserById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }
  return response.json()
}

export const updateUser = async (id: number, userData: any) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to update user")
  }
  return response.json()
}
