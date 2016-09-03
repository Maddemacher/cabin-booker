(ns cabinbooker.views
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [reagent.core  :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [cljs-uuid-utils.core :as uuid]))


(defn price-table-row [price]
  [:tr {:key (uuid/make-random-uuid) }
   [:td (:type price)]
   [:td (:start-week price)]
   [:td (:end-week price)]
   [:td (:price price)]])

(defn new-price [state]
  (let [{type :type np :new-price psw :price-start-week pew :price-end-week} state]
    [:div.row
     [:div.col-lg-2.form-group
      [:label.control-label "Typ"]
      [:input.form-control {:type "text"
                            :value type
                            :on-change #(dispatch [:update-view-state (assoc state :type (-> % .-target .-value))])}]]
     [:div.col-lg-2.form-group
      [:label.control-label "Startvecka"]
      [:input.form-control {:type "number"
                            :min 1
                            :max 52
                            :value psw
                            :on-change #(dispatch [:update-view-state (assoc state :price-start-week (-> % .-target .-value))])
                            }]]
     [:div.col-lg-2.form-group
      [:label.control-label "Slutvecka"]
      [:input.form-control {:type "number"
                            :min 1
                            :max 52
                            :value pew
                            :on-change #(dispatch [:update-view-state (assoc state :price-end-week (-> % .-target .-value))])
                            }]]
     [:div.col-lg-2.form-group
      [:label.control-label "Pris"]
      [:input.form-control {:type "number"
                            :min 1
                            :value np
                            :on-change #(dispatch [:update-view-state (assoc state :new-price (-> % .-target .-value))])
                            }]]
     [:div.col-lg-2.form-group
      [:button.button-block.btn.btn-success {:on-click #(dispatch [:update-view-state (update-in state [:prices] (fnil conj []) {:type type :price np :start-week psw :end-week pew})])} "Lägg till"]]]))

(defn create-cabin [state]
    [:div.well.clearfix
     [:div.row
      [:div.form-group.col-lg-12
       [:label.control-label "Namn"]
       [:input.form-control {}]]
      [:div.form-group.col-lg-12
       [:label.control-label "Kod"]
       [:input.form-control {}]]]
     [:table.col-lg-12.table.table-striped
      [:thead
       [:tr
        [:th "Typ"]
         fs[:th "Startvecka"]
        [:th "Slutvecka"]
        [:th "Pris"]]]
      [:tbody
       (map price-table-row (:prices state))]] 
     (new-price state)
     [:div.row
      [:div.pull-right.col-lg-2.input-group
       [:button.btn.btn-danger {:on-click #()} "Cancel"]
       [:button.btn.btn-success {:on-click #()} "Save"]]]])

(defn cabins []
  [:span "Cabins"])

(defn book-cabin []
  [:span "Book cabin"])

(defn menu []
  [:div {:id "sidebar-wrapper"}
   [:ul.sidebar-nav
    [:li.sidebar-brand {:on-click #(dispatch [:set-view :cabins])}
     [:a {:href "#"} "Stugor"]]
    [:li.sidebar-brand {:on-click #(dispatch [:set-view :create-cabin {:new-price 1 :price-start-week 1 :price-end-week 52}])}
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
         :create-cabin [create-cabin (:state @view)]
         :cabins [cabins]
         :book-cabin [book-cabin]
         [intro])])))

(defn index []
  [:div
   [menu]
   [content]])
