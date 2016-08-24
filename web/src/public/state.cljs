(ns public$.state
  (:require  [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)

(def view-state (reagent/atom {}))

(defn get-current-view []
  (:view @view-state))

(defn set-current-view [new-view]
  (swap! view-state assoc :view new-view))
