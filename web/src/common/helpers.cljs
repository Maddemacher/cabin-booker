(ns common.helpers
 (:require [clojure.string :as string]))

(defn get-value[event]
  (-> event .-target .-value))

(defn capitalize-key [key]
  (println key)
  (keyword (->> (string/split (subs (str key)) "-")
                (map string/capitalize)
                string/join)))


(defn prepare-for-backend [obj]
  (println "preparing " obj "for backend")
  (println "keys " (keys obj))
  (let [newmap (->> (map #(list % (capitalize-key %)) (keys obj))
                    (rename-keys obj)
                    (flatten))]
    (println newmap)
    newmap))
