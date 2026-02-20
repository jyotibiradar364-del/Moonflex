import requests
import os
from django.conf import settings

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
TMDB_BASE_URL = "https://api.themoviedb.org/3"

class TMDBService:
    @staticmethod
    def _get_headers():
        # TMDB API Key can be passed as a query param or bearer token.
        # Here we use query param for simplicity, or bearer if using Read Access Token.
        # Setup for query param usage mainly as per standard API key.
        return {}

    @staticmethod
    def fetch_from_tmdb(endpoint, params=None):
        if not TMDB_API_KEY:
            return {"error": "TMDB_API_KEY not configured"}
        
        if params is None:
            params = {}
        
        params['api_key'] = TMDB_API_KEY
        params['language'] = 'en-US'
        
        url = f"{TMDB_BASE_URL}/{endpoint}"
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    @staticmethod
    def get_trending_movies(time_window='week'):
        return TMDBService.fetch_from_tmdb(f"trending/movie/{time_window}")

    @staticmethod
    def get_popular_movies():
        return TMDBService.fetch_from_tmdb("movie/popular")

    @staticmethod
    def get_top_rated_movies():
        return TMDBService.fetch_from_tmdb("movie/top_rated")

    @staticmethod
    def get_upcoming_movies():
        return TMDBService.fetch_from_tmdb("movie/upcoming")

    @staticmethod
    def get_movie_details(movie_id):
        # Append 'videos' to get trailer info in one request
        params = {'append_to_response': 'videos,credits,similar'}
        return TMDBService.fetch_from_tmdb(f"movie/{movie_id}", params=params)

    @staticmethod
    def get_tv_shows(category='popular'):
        # category can be: popular, top_rated, on_the_air, airing_today
        return TMDBService.fetch_from_tmdb(f"tv/{category}")
