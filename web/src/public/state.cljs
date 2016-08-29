(ns public$.state
  (:require  [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)

(def view-state (reagent/atom {}))

(defn get-current-view []
  (:view @view-state))

(defn set-current-view [new-view]
  (swap! view-state assoc :view new-view))

(defn get-create-cabin-state []
  (if (:create-cabin-state @view-state)
    (:create-cabin-state @view-state)
    (do (swap! view-state update-in [:create-cabin-state] #(reagent/atom {}))
        (get-create-cabin-state))))
