(ns public$.core
    (:require [reagent.core :as reagent :refer [atom]]
              [public$.cabins :as cabins]
              [public$.createcabin :as createcabin]
              [public$.state :as state]))

(enable-console-print!)


;; -------------------------
;; Views
(defn home-page []
  [:div [:h2 "Welcome to Reagent"]
    [:div.col-lg-12
     [:div.well.clearfix
     [:div.col-lg-4
        [:button.btn.btn-default.btn-block {:on-click #(state/set-current-view (cabins/component))} "Go to cabins"]]
      [:div.col-lg-4
        [:button.btn.btn-default.btn-block {:on-click #(state/set-current-view (createcabin/component))} "Go to create cabins"]]]]
    [:div.col-lg-12 (state/get-current-view)]])

;; -------------------------
;; Initialize app

(defn mount-root []
  (reagent/render [home-page] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
