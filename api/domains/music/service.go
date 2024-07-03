package music

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"github.com/Courtcircuits/jukeboxd/utils"
)

type TokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int    `json:"expires_in"`
}

type SpotifyTrack struct {
	Tracks struct {
		Href  string `json:"href"`
		Items []struct {
			Album struct {
				AlbumType string `json:"album_type"`
				Artists   []struct {
					ExternalUrls struct {
						Spotify string `json:"spotify"`
					} `json:"external_urls"`
					Href string `json:"href"`
					ID   string `json:"id"`
					Name string `json:"name"`
					Type string `json:"type"`
					URI  string `json:"uri"`
				} `json:"artists"`
				AvailableMarkets []string `json:"available_markets"`
				ExternalUrls     struct {
					Spotify string `json:"spotify"`
				} `json:"external_urls"`
				Href   string `json:"href"`
				ID     string `json:"id"`
				Images []struct {
					Height int    `json:"height"`
					URL    string `json:"url"`
					Width  int    `json:"width"`
				} `json:"images"`
				Name                 string `json:"name"`
				ReleaseDate          string `json:"release_date"`
				ReleaseDatePrecision string `json:"release_date_precision"`
				TotalTracks          int    `json:"total_tracks"`
				Type                 string `json:"type"`
				URI                  string `json:"uri"`
			} `json:"album"`
			Artists []struct {
				ExternalUrls struct {
					Spotify string `json:"spotify"`
				} `json:"external_urls"`
				Href string `json:"href"`
				ID   string `json:"id"`
				Name string `json:"name"`
				Type string `json:"type"`
				URI  string `json:"uri"`
			} `json:"artists"`
			AvailableMarkets []string `json:"available_markets"`
			DiscNumber       int      `json:"disc_number"`
			DurationMs       int      `json:"duration_ms"`
			Explicit         bool     `json:"explicit"`
			ExternalIds      struct {
				Isrc string `json:"isrc"`
			} `json:"external_ids"`
			ExternalUrls struct {
				Spotify string `json:"spotify"`
			} `json:"external_urls"`
			Href        string `json:"href"`
			ID          string `json:"id"`
			IsLocal     bool   `json:"is_local"`
			Name        string `json:"name"`
			Popularity  int    `json:"popularity"`
			PreviewURL  string `json:"preview_url"`
			TrackNumber int    `json:"track_number"`
			Type        string `json:"type"`
			URI         string `json:"uri"`
		} `json:"items"`
		Limit    int `json:"limit"`
		Next     any `json:"next"`
		Offset   int `json:"offset"`
		Previous any `json:"previous"`
		Total    int `json:"total"`
	} `json:"tracks"`
}

func getAuthToken() TokenResponse {
	urlApi := "https://accounts.spotify.com/api/token"
	client := &http.Client{}
	formData := url.Values{
		"grant_type": {"client_credentials"},
	}
	req, err := http.NewRequest("POST", urlApi, bytes.NewBufferString(formData.Encode()))

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Accept", "application/json")

	tokens := base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", utils.Get("SPOTIFYCLIENTID"), utils.Get("SPOTIFYCLIENTSECRET"))))

	fmt.Printf("Tokens: %s\n", tokens)

	req.Header.Add("Authorization", fmt.Sprintf("Basic %s", tokens))

	if err != nil {
		fmt.Printf("%v \n", err)
		panic("Need to renew spotify tokens !!!")
	}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	fmt.Println(string(body))
	tokens_response := TokenResponse{}
	err = json.Unmarshal(body, &tokens_response)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		panic("Error decoding response")
	}
	return tokens_response
}

func SearchMusic(name string, artist string) []Music {
	// Search music by name and artist
	token := getAuthToken()
	fmt.Printf("Looking for %s by %s\n", name, artist)
	q := url.QueryEscape(fmt.Sprintf("track:%s artist:%s", name, artist))
	urlApi := fmt.Sprintf("https://api.spotify.com/v1/search?q=%s&type=track", q)
	fmt.Printf("URL: %s\n", urlApi)
	client := &http.Client{}
	req, err := http.NewRequest("GET", urlApi, nil)
	if err != nil {
		panic(err)
	}
	req.Header.Add("Authorization", fmt.Sprintf("%s %s", token.TokenType, token.AccessToken))
	req.Header.Add("Accept", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	spotifyTrack := SpotifyTrack{}

	err = json.Unmarshal(body, &spotifyTrack)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		panic("Error decoding response")
	}
	result := make([]Music, len(spotifyTrack.Tracks.Items))
	for i, item := range spotifyTrack.Tracks.Items {
		result[i] = Music{
			Title:       item.Name,
			Artist:      item.Artists[0].Name,
			Album:       item.Album.Name,
			Picture:     item.Album.Images[0].URL,
			Preview:     item.PreviewURL,
			SpotifyLink: item.ExternalUrls.Spotify,
		}
	}
	return result

}
