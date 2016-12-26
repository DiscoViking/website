package pages

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func AddRoutes(r *mux.Router, service Service) {
	r.HandleFunc("/{key}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		key := vars["key"]

		log.Printf("Received request to GET post %v", key)

		page, err := service.Get(key)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to load object %v", err), 404)
			return
		}

		encoder := json.NewEncoder(w)
		err = encoder.Encode(page)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to write page to response %v", err), 503)
			return
		}

		return
	}).Methods("GET")

	r.HandleFunc("/{key}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		key := vars["key"]

		log.Printf("Received request to PUT post %v", key)

		decoder := json.NewDecoder(r.Body)
		page := Page{}
		err := decoder.Decode(&page)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to decode page from request body: %v", err), 400)
			return
		}

		err = service.Put(key, page)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to store page: %v", err), 503)
			return
		}

		return
	}).Methods("PUT")

	r.HandleFunc("/{key}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		key := vars["key"]

		log.Printf("Received request to DELETE post %v", key)

		err := service.Delete(key)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to delete page: %v", err), 503)
		}

		return
	}).Methods("DELETE")
}