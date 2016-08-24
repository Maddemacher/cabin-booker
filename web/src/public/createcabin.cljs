(ns public$.createcabin
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require  [cljs.core.async :refer [<!]]
             [reagent.core :as reagent :refer [atom]]
             [cljs-http.client :as http]
             [public$.state :as state]
             [public$.cabins :as cabins]
             [public$.price :as price]))

(def creation-state (reagent/atom {}))

(defn save-cabin [cabin]
  (println cabin))

(defn component[]
 [:div.well.clearfix
  [:div.row
    [:div.form-group.col-lg-12
      [:label.control-label "Name"]
      [:input.form-control {:field :text :id :first-name}]]

    [:div.form-group.col-lg-12
      [:label.control-label "Code"]
      [:input.form-control {:field :text :id :first-name}]]
   ]

 [:div.row
  (price/component)]


   [:div.pull-right.col-lg-2.input-group
    [:button.btn.btn-danger {:on-click #(state/set-current-view (cabins/component))} "Cancel"]
    [:button.btn.btn-success {:on-click #(save-cabin @creation-state)} "Save"]
  ]
])
