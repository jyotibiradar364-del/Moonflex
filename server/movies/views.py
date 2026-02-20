from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .services import TMDBService

class TrendingMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.get_trending_movies()
        return Response(data)

class PopularMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.get_popular_movies()
        return Response(data)

class TopRatedMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.get_top_rated_movies()
        return Response(data)

class UpcomingMoviesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = TMDBService.get_upcoming_movies()
        return Response(data)

class MovieDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, movie_id):
        data = TMDBService.get_movie_details(movie_id)
        return Response(data)

class TVShowsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, category='popular'):
        data = TMDBService.get_tv_shows(category)
        return Response(data)
