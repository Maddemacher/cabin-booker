(ns public$.cabin
    (:require-macros [cljs.core.async.macros :refer [go]])
    (:require  [cljs.core.async :refer [<!]]
               [reagent.core :as reagent :refer [atom]]
               [cljs-http.client :as http]))
