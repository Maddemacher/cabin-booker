(ns common.helpers)

(defn get-value[event]
  (-> event .-target .-value))
