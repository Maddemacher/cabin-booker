(ns cabinbooker.db
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [re-frame.core :refer [reg-event-db
                                   reg-sub]]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<!]]
            [common.helpers :as helpers]))

(def initial-state {})

;; events
(reg-event-db :initialize (fn [db _]
                            (println "initializing db")
                            initial-state))

(reg-event-db :set-view (fn [db [_ view state]]
                          (println "got new view and state " view state)
                          (assoc db :view view :state state)))

(reg-event-db :update-view-state (fn [db [_ state]]
                                   (println "updating view state from: " db " to: " state)
                                   (assoc db :state state)))

(reg-event-db :add-price (fn [db [_ price]]
                           (println "adding new price " price)
                           (update-in db [:state :prices] (fnil conj []) price)))

(reg-event-db :save-cabin (fn [db [_ cabin]]
                            (println "Saving cabin " cabin " db " db)
                            (go (let [response (<! (http/post
                                                    "http://localhost:3000/api/cabins"
                                                    {:json-params (helpers/prepare-for-backend cabin)}))]))
                            db))


;; subscriptions
(reg-sub :view (fn [db _]
                 (println "publishing view " db)
                 {:view (:view db) :state (:state db)}))
