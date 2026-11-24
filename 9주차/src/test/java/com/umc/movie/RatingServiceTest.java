package com.umc.movie;

import com.umc.movie.dto.CreateRatingRequest;
import com.umc.movie.dto.UpdateRatingRequest;
import com.umc.movie.entity.Member;
import com.umc.movie.entity.Rating;
import com.umc.movie.exception.ApiException;
import com.umc.movie.repository.MemberRepository;
import com.umc.movie.repository.RatingRepository;
import com.umc.movie.service.RatingService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class RatingServiceTest {

    @Mock
    private RatingRepository ratingRepository;

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private RatingService ratingService;

    @Test
    @DisplayName("같은 영화에 평점을 중복 등록하면 RATING409_1 예외를 던진다")
    void createRatingWhenDuplicated() {
        Long memberId = 1L;
        Long movieId = 550L;
        Member member = Member.builder()
                .email("owner@umc.com")
                .password("password")
                .nickname("영화조아")
                .build();

        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));
        given(ratingRepository.existsByMember_MemberIdAndMovieId(memberId, movieId)).willReturn(true);

        assertThatThrownBy(() -> ratingService.create(memberId, new CreateRatingRequest(movieId, 5, "좋아요")))
                .isInstanceOf(ApiException.class)
                .satisfies(exception -> assertThat(((ApiException) exception).getCode()).isEqualTo("RATING409_1"));
    }

    @Test
    @DisplayName("다른 회원의 평점을 수정하면 RATING403_1 예외를 던진다")
    void updateRatingOwnedByAnotherMember() {
        Long ownerId = 1L;
        Long requesterId = 2L;
        Long ratingId = 10L;
        Member owner = Member.builder()
                .email("owner@umc.com")
                .password("password")
                .nickname("작성자")
                .build();
        ReflectionTestUtils.setField(owner, "memberId", ownerId);

        Rating rating = Rating.builder()
                .member(owner)
                .movieId(550L)
                .score(4)
                .comment("기존 후기")
                .build();
        given(ratingRepository.findById(ratingId)).willReturn(Optional.of(rating));

        assertThatThrownBy(() -> ratingService.update(requesterId, ratingId, new UpdateRatingRequest(2, "수정 시도")))
                .isInstanceOf(ApiException.class)
                .satisfies(exception -> assertThat(((ApiException) exception).getCode()).isEqualTo("RATING403_1"));
    }
}
