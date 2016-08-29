(ns public$.createcabin
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require  [cljs.core.async :refer [<!]]
             [reagent.core :as reagent :refer [atom]]
             [cljs-http.client :as http]
             [public$.state :as state]
             [public$.cabins :as cabins]
             [public$.price :as price]
             [common.helpers :as helpers]
             [cljs-uuid-utils.core :as uuid]
             [reagent-forms.core :as rf :refer [bind-fields]]))

(defn save-cabin [cabin]
  (println cabin))

(defn add-new-price[creation-state]
  (swap! creation-state update-in [:prices] #(conj % (:new-price @creation-state)))
  (swap! creation-state assoc :new-price {}))

(defn row [label input]
  [:div.col-lg-2.form-group
    [:label.control-label label]
    [:input.form-control input]])

(def new-price-template
  [:div.row
      (row "Typ" {:field :text :id :new-price.type})
      (row "Startvecka" {:field :numeric :id :new-price.start-week})
      (row "Slutvecka" {:field :numeric :id :new-price.end-week})
      (row "Pris" {:field :numeric :id :new-price.price})])

(def cabin-base-template
  [:div.row
    [:div.form-group.col-lg-12
      [:label.control-label "Namn"]
      [:input.form-control {:field :text :id :name}]]

    [:div.form-group.col-lg-12
      [:label.control-label "Kod"]
      [:input.form-control {:field :text :id :code}]]])

(defn price-table-row [price]
  [:tr {:key (:key price)}
    [:td (:type price)]
    [:td (:start-week price)]
    [:td (:end-week price)]
    [:td (:price price)]])

(defn component[]
 (let [state (reagent/atom {:prices [{:key (uuid/uuid-string (uuid/make-random-uuid)) :type "a" :start-week 1 :end-week 3 :price 4}]})]
  (println @state)
 [:div.well.clearfix
  [bind-fields cabin-base-template state]
 [:table.col-lg-12.table.table-striped
  [:thead
   [:tr
      [:th "Typ"]
      [:th "Startvecka"]
      [:th "Slutvecka"]
      [:th "Pris"]]]
  [:tbody
    (map #(price-table-row %) (:prices @state))]]
 [bind-fields new-price-template state]
 [:div.col-lg-2.form-group
   [:button.button-block.btn.btn-success {:on-click #(add-new-price state)} "Lägg till"]]

 [:div.pull-right.col-lg-2.input-group
  [:button.btn.btn-danger {:on-click #(state/set-current-view (cabins/component))} "Cancel"]
  [:button.btn.btn-success {:on-click #(save-cabin @state)} "Save"]]]))
