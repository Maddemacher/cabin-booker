(ns public$.cabins
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require  [cljs.core.async :refer [<!]]
             [reagent.core :as reagent :refer [atom]]
             [cljs-http.client :as http]))

(enable-console-print!)

(def cabin-state (reagent/atom {}))

(defn component []
  (go (let [cabins (<! (http/get "/api/cabins"))]
    (println cabins)))
  [:span "Cabins"])
