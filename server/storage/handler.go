package storage

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func AddRoutes(r *mux.Router, service Service) {
	r.HandleFunc("/{key}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		key := vars["key"]

		blob, err := service.Get(key)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to load object %v", err), 404)
			return
		}

		n, err := w.Write(blob)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to write object %v", err), 503)
			return
		}

		if n != len(blob) {
			http.Error(w, "failed to write out object", 503)
			return
		}

		return
	}).Methods("GET")
}
