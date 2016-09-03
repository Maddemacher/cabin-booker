(ns cabinbooker.core
  (:require [cabinbooker.db :as db]
            [cabinbooker.views :as views]
            [reagent.core :as reagent]
            [re-frame.core :refer [dispatch-sync]]))

(enable-console-print!)

(defn run []
  (dispatch-sync [:initialize])
  (reagent/render [views/index]
                  (js/document.getElementById "app")))

(run)
