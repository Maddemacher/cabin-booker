(ns cabinbooker.db
  (:require [re-frame.core :refer [reg-event-db
                                   reg-sub]]))

(def initial-state {})

;; events
(reg-event-db :initialize (fn [db _] (merge db initial-state)))

(reg-event-db :set-view (fn [db [_ view state]]
                          (println "got new view and state")
                          (assoc db :view view :state state)))

(reg-event-db :update-view-state (fn [db [_ state]]
                                   (println "updating view state from: " db " to: " state)
                                   (assoc db :state state)))

(reg-event-db :update-view-value (fn [db [_ key value]]
                                   (update-in db [(:view db) key] value)))

(reg-event-db :add-price (fn [db [_ price]]
                           (update-in db [:state :prices] (fnil conj []) price)
                           (println " after price added " db)))

(reg-event-db :save-cabin (fn [db [_ cabin]]
                            (println "Saving cabin " cabin)))


;; subscriptions
(reg-sub :view (fn [db _]
                 (println "publishing view " db)
                   {:view (:view db) :state (:state db)}))
