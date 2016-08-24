(ns public$.price
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require  [cljs.core.async :refer [<!]]
             [reagent.core :as reagent :refer [atom]]
             [cljs-http.client :as http]
             [public$.state :as state]
             [public$.cabins :as cabins]))


(defn component[]
  [:div.col-lg-12
   [:div.form-group.col-lg-3
    [:label "Type"]
    [:input.form-control {:field :text :id :first-name}]]

  [:div.form-group.col-lg-3
    [:label.control-label "StartWeek"]
    [:input.form-control {:field :text :id :first-name}]]

  [:div.form-group.col-lg-3
    [:label.control-label "EndWeek"]
    [:input.form-control {:field :text :id :first-name}]]

  [:div.form-group.col-lg-3
    [:label.control-label "Price"]
    [:input.form-control {:field :text :id :first-name}]]
   ])
