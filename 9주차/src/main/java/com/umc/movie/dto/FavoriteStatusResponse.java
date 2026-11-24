package com.umc.movie.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FavoriteStatusResponse(
        @JsonProperty("isFavorite") boolean isFavorite
) {
}