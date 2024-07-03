package music

type Music struct {
	Title       string `json:"title"`
	Artist      string `json:"artist"`
	Album       string `json:"album"`
	Picture     string `json:"picture"`
	Preview     string `json:"preview"`
	SpotifyLink string `json:"spotify_link"`
}
