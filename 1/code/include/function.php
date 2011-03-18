<?php

function getEl($xmlobj,$name){
	$el=$xmlobj->xpath($name);
	if($el)
	return $el[0]."";
	else
		return '';
}
	/**
	 * 添加或插入数据
	 * @param $data 键/值对应的数组，其中键为字段名，值为要插入的内容
	 * @param $id int 更新时使用的关键字，如果指定该项，则执行更新操作
	 * @param $table string 表单名，如果不指定，则使用setTable()设置的默认表名
	 * @param $id_name string 字段名，更新时用于查询的字段，默认查询名为'id'的字段
	 * @return int|false 返回最后插入的记录ID或更新记录的ID,失败返回false
	 */
	function save($data, $id = '', $table = '', $id_name = 'id') {
		global $mysql;

		if ($id == '') {
			$type = 'insert';
		} else {
			$type = 'update';
		}

		if ($type == 'insert') {
			$keys = array();
			$values = array();
			foreach ($data as $key => $value) {
				$keys[] = '`' .$key . '`';
				$values[] = '"' .mysql_escape_string($value) . '"';
			}
			if (sizeof($keys) != sizeof($values)) {
				return false;
			}
			$ignore = '';

			$sql = 'INSERT  INTO ' . $table . '(' .implode(',', $keys). ') VALUES('. implode(',', $values) .')';	
//			echo $sql;
			$mysql->runSql($sql);

			if ($mysql->errno() != 0) {
				die( "Error:" . $mysql->errmsg() );
				return false;
			}
			return $mysql->lastId();
		}
		$values = array();
		foreach ($data as $key=>$value) {
			$values[] = '`' .trim($key) . '`="' . mysql_escape_string($value) . '"';
		}
		if (!sizeof($values)) {
			return false;
		}
		$sql = 'UPDATE ' . $table . ' SET ' . implode(',', $values) . ' WHERE ' . $id_name . '=' . $id;
//		echo $sql;
		$mysql->runSql($sql);
		if ($mysql->errno() != 0) {
			die( "Error:" . $mysql->errmsg() );
			return false;
		}

		return 1;
	}
?>