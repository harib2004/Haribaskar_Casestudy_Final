package com.hexaware.cozyhaven.service;

import java.util.List;

import com.hexaware.cozyhaven.entity.Hotel;

public interface IHotelService {
	
	public Hotel addHotel(Hotel hotel);
    public List<Hotel> getAllHotels();
    public Hotel getHotelById(Integer hotelId);
    public List<Hotel> getHotelsByLocation(String location);
    public void deleteHotel(Integer hotelId);
    public Hotel updateHotel(Integer hotelId, Hotel updatedHotel);
    public List<Hotel> getByOwnerId(Integer userId);
}
