(ns public$.core
    (:require [reagent.core :as reagent :refer [atom]]
              [public$.cabins :as cabins]
              [public$.createcabin :as createcabin]
              [public$.bookcabin :as bookcabin]
              [public$.state :as state]))

(enable-console-print!)


;; -------------------------
;; Views
(defn index []
 [:div
  [:div {:id "sidebar-wrapper"}
    [:ul.sidebar-nav
      [:li.sidebar-brand {:on-click #(state/set-current-view (cabins/component))}
        [:a {:href "#"} "Stugor"]]
      [:li.sidebar-brand {:on-click #(state/set-current-view (createcabin/component))}
        [:a {:href "#"} "Skapa Stuga"]]
      [:li.sidebar-brand {:on-click #(state/set-current-view (bookcabin/component))}
        [:a {:href "#"} "Boka Stuga"]]]]

  [:div {:id "page-content-wrapper"}
    [:div.container-fluid
      [:div.row
        [:div.col-lg-12 [state/get-current-view]]]]]])

;; -------------------------
;; Initialize app

(defn mount-root []
  (reagent/render [index] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
