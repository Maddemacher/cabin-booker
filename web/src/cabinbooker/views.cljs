(ns cabinbooker.views
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [reagent.core  :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [cljs-uuid-utils.core :as uuid]
            [cabinbooker.createcabin :as create-cabin]))


(defn cabins []
  [:span "Cabins"])

(defn book-cabin []
  [:span "Book cabin"])

(defn menu []
  [:div {:id "sidebar-wrapper"}
   [:ul.sidebar-nav
    [:li.sidebar-brand {:on-click #(dispatch [:set-view :cabins])}
     [:a {:href "#"} "Stugor"]]
    [:li.sidebar-brand {:on-click #(dispatch [:set-view :create-cabin create-cabin/initial-state])}
     [:a {:href "#"} "Skapa Stuga"]]
    [:li.sidebar-brand {:on-click #(dispatch [:set-view :book-cabin])}
     [:a {:href "#"} "Boka Stuga"]]]])

(defn intro []
  (println "intro redraw")
  [:div "Hej mamma"])

(defn content []
  (let [view (subscribe [:view])]
    (fn []
      (println "redrawing content" @view)
      [:div {:id "page-content-wrapper"}
       (condp = (:view @view)
         :create-cabin [create-cabin/component (:state @view)]
         :cabins [cabins]
         :book-cabin [book-cabin]
         [intro])])))

(defn index []
  [:div
   [menu]
   [content]])
