import AssemblyKeys._

assemblySettings

name := "VotingMachine"

version := "1.0"

scalaVersion := "2.10.4"

jarName in assembly := "VotingMachine.jar"

assemblyOption in assembly ~= { _.copy(includeScala = false) }




libraryDependencies ++= Seq(
   ("org.apache.spark" %% "spark-core" % "1.3.1" % "provided").exclude("commons-logging", "commons-logging"),
   ("org.apache.spark" %% "spark-hive" % "1.3.1").exclude("com.twitter", "parquet-hadoop-bundle").exclude("org.apache.avro", "avro-ipc").exclude("com.twitter", "parquet-format") ,
   "org.apache.spark" %% "spark-streaming" % "1.3.1",
  ("org.apache.spark" %% "spark-streaming-kafka" % "1.3.1" ).exclude("commons-beanutils", "commons-beanutils").
    exclude("commons-collections", "commons-collections").
    exclude("com.esotericsoftware.minlog", "minlog") ,
   "org.apache.hbase" % "hbase-common" % "1.0.3" excludeAll(ExclusionRule(organization = "javax.servlet", name="javax.servlet-api"), ExclusionRule(organization = "org.mortbay.jetty", name="jetty"), ExclusionRule(organization = 	"org.mortbay.jetty", name="servlet-api-2.5"), ExclusionRule(organization = "org.codehaus.jackson", name="jackson-core-asl")),
   "org.apache.hbase" % "hbase-client" % "1.0.3" excludeAll(ExclusionRule(organization = "javax.servlet", name="javax.servlet-api"), ExclusionRule(organization = "org.mortbay.jetty", name="jetty"), ExclusionRule(organization = 	"org.mortbay.jetty", name="servlet-api-2.5"), ExclusionRule(organization = "org.codehaus.jackson", name="jackson-core-asl") ),
   "org.apache.hbase" % "hbase-server" % "1.0.3" excludeAll(ExclusionRule(organization = "javax.servlet", name="javax.servlet-api"), ExclusionRule(organization = "org.mortbay.jetty", name="jetty"), ExclusionRule(organization = 	"org.mortbay.jetty", name="servlet-api-2.5"), ExclusionRule(organization = "org.codehaus.jackson", name="jackson-core-asl") )
)


mergeStrategy in assembly <<= (mergeStrategy in assembly) { (old) =>
  {
    case x if x.startsWith("META-INF/maven/com.fasterxml.jackson.core") => MergeStrategy.last
    case x if x.startsWith("META-INF/maven/commons-logging") => MergeStrategy.last
    case x if x.startsWith("META-INF/ECLIPSEF.RSA") => MergeStrategy.last
    case x if x.startsWith("META-INF/mailcap") => MergeStrategy.last
    case x if x.startsWith("plugin.properties") => MergeStrategy.last

    case PathList("plugin.xml", xs@_ *) => MergeStrategy.last 
    case PathList("com", "esotericsoftware", xs@_ *) => MergeStrategy.last 
    case PathList("org", "apache", "commons" , xs@_ *) => MergeStrategy.last 
    case PathList("org", "apache","hadoop", "yarn" , xs@_ *) => MergeStrategy.last 
    case PathList("org", "apache","jasper", xs@_ *) => MergeStrategy.last 
    case PathList("org", "apache","spark", "unused" , xs@_ *) => MergeStrategy.last

    case PathList("overview.html", xs@_ *) => MergeStrategy.discard 
    case PathList("javax", "servlet", xs@_ *) => MergeStrategy.discard 
    case PathList("com", "google","common", "base"  , xs@_ *) => MergeStrategy.discard 
    case x => old(x)
  }
}
