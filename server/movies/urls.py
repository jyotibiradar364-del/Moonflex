from django.urls import path
from .views import (
    TrendingMoviesView, 
    PopularMoviesView, 
    TopRatedMoviesView, 
    UpcomingMoviesView, 
    MovieDetailsView,
    TVShowsView
)

urlpatterns = [
    path('trending/', TrendingMoviesView.as_view(), name='trending-movies'),
    path('popular/', PopularMoviesView.as_view(), name='popular-movies'),
    path('top-rated/', TopRatedMoviesView.as_view(), name='top-rated-movies'),
    path('upcoming/', UpcomingMoviesView.as_view(), name='upcoming-movies'),
    path('<int:movie_id>/', MovieDetailsView.as_view(), name='movie-details'),
    path('tv/<str:category>/', TVShowsView.as_view(), name='tv-shows'),
]
