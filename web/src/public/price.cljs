(ns public$.price
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require  [cljs.core.async :refer [<!]]
             [reagent.core :as reagent :refer [atom]]
             [cljs-http.client :as http]
             [public$.state :as state]
             [public$.cabins :as cabins]))


(defn component[price]
  [:div {}])
