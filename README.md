Spark Streaming with Kafka, Hbase:
==================================

Make sure the zoo-keeper is started: 
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
Start the kafka broker: 
sudo bin/kafka-server-start.sh config/server.properties
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
Create a topic : 
[cloudera@quickstart kafka_2.10-0.8.2.0]$ sudo ./bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic spark-topic
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
To List the topics: 
./bin/kafka-topics.sh --list --zookeeper localhost:2181
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
To start a kafka producer
./bin/kafka-console-producer.sh --broker-list localhost:9092 --topic spark-topic
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
To build the project, run the below sbt command 
[cloudera@quickstart VotingMachine]$ pwd
/home/cloudera/VotingMachine
[cloudera@quickstart VotingMachine]$ sbt assembly


To import the project to ecilpse, run below command to conver to a eclipse project

/home/cloudera/VotingMachine
[cloudera@quickstart VotingMachine]$ sbt eclipse


+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
To Start the application, run below command

spark-submit --class my.example.SparkKafka.KafkaVoteCount --master local[2] /home/cloudera/VotingMachine/target/scala-2.10/VotingMachine.jar localhost:2181 KafkaVoteCount spark-topic 1

Pre-requestites: 

- Kafka topic and producer has to be Up and running. 
- Hbase thrift server and zookeeper should be running. Because the spark program connects to Hbase thrift server via zookeeper. 
- Hbase table and Column family has to be created. (Refer hbase.ddl)
+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
