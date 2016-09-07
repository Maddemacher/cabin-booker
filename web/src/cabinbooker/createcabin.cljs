(ns cabinbooker.createcabin
  (:require [reagent.core :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [cljs-uuid-utils.core :as uuid]
            [common.helpers :refer [get-value]]
            [clojure.set :as cset]))

(defonce initial-state {:new-price 1 :price-start-week 1 :price-end-week 52})

(defn remove-nil [s]
  (cset/difference #{nil} s))

(defn validate-new-price [new-price current-prices]
  (remove-nil (set [
                    (when-not (:type new-price) :no-type)
                    (when-not (< (:price-start-week new-price) 1) :no-start-week)
                    (when-not (< (:price-end-week new-price) 1) :no-end-week)
                    (when (some? (some true? (map #(or
                                          (<= (:start-week %) (:start-week new-price) (:end-week %))
                                          (<= (:start-week %) (:end-week new-price) (:end-week %))
                                          ) current-prices))) :conflicts)])))
(defn validate-cabin [cabin]
  (remove-nil (set [(when-not (:name cabin) :no-name)
                    (when-not (:code cabin) :no-code)
                    (when (empty? (:prices cabin)) :no-price)])))

(defn dispatch-new-price [new-price state]
  (let [validation (validate-new-price new-price (:prices state))]
    (if (empty? validation)
      (dispatch [:update-view-state (update-in state [:prices] (fnil conj []) new-price)])
      (dispatch [:update-view-state (assoc state :validation validation)]))))


(defn dispatch-cabin-save [cabin]
  (let [validation (validate-cabin cabin)]
    (if (empty? validation)
      (dispatch [:save-cabin cabin])
      (dispatch [:update-view-state (assoc cabin :validation validation)]))))

(defn price-table-row [price]
  [:tr {:key (uuid/make-random-uuid) }
   [:td (:type price)]
   [:td (:start-week price)]
   [:td (:end-week price)]
   [:td (:price price)]])

(defn new-price [state]
  (let [{type :type np :new-price psw :price-start-week pew :price-end-week validation :validation} state]
    [:div.row
     [:div.col-lg-2.form-group {:class (when (contains? validation :no-type) "has-error")}
      [:label.control-label "Typ"]
      [:input.form-control {:type "text"
                            :value type
                            :on-change #(dispatch [:update-view-state (assoc state :type (get-value %))])}]]
     [:div.col-lg-2.form-group
      [:label.control-label "Startvecka"]
      [:input.form-control {:type "number"
                            :min 1
                            :max 52
                            :value psw
                            :on-change #(dispatch [:update-view-state (assoc state :price-start-week (get-value %))])
                            }]]
     [:div.col-lg-2.form-group
      [:label.control-label "Slutvecka"]
      [:input.form-control {:type "number"
                            :min 1
                            :max 52
                            :value pew
                            :on-change #(dispatch [:update-view-state (assoc state :price-end-week (get-value %))])
                            }]]
     [:div.col-lg-2.form-group
      [:label.control-label "Pris"]
      [:input.form-control {:type "number"
                            :min 1
                            :value np
                            :on-change #(dispatch [:update-view-state (assoc state :new-price (get-value %))])
                            }]]
     [:div.col-lg-2.form-group
      [:button.button-block.btn.btn-success {:on-click #(dispatch-new-price {:type type :price np :start-week psw :end-week pew} state)} "Lägg till"]]]))

(defn component [state]
  (let [{name :name code :code validation :validation} state]
    [:div.well.clearfix
     [:div.row
      [:div.form-group.col-lg-12 {:class (when (contains? validation :no-name) "has-error")}
       [:label.control-label "Namn"]
       [:input.form-control {
                             :type "text"
                             :value name
                             :on-change #(dispatch [:update-view-state (assoc state :name (get-value %))])
                             }]]
      [:div.form-group.col-lg-12 {:class (when (contains? validation :no-code) "has-error")}
       [:label.control-label "Kod"]
       [:input.form-control {
                             :type "text"
                             :value code
                             :on-change #(dispatch [:update-view-state (assoc state :code (get-value %))])}]]]
     [:table.col-lg-12.table.table-striped
      [:thead
       [:tr
        [:th "Typ"]
        [:th "Startvecka"]
        [:th "Slutvecka"]
        [:th "Pris"]]]
      [:tbody
       (map price-table-row (:prices state))]]
     (when (contains? validation :no-price) [:label.warning-text "Denna stuga har inga priser"])
     (new-price state)
     [:div.row
      [:div.pull-right.col-lg-2.input-group
       [:button.btn.btn-danger {:on-click #(dispatch [:update-view-state initial-state])} "Börja om"]
       [:button.btn.btn-success {:on-click #(dispatch-cabin-save state)} "Spara stuga"]]]])
  )
